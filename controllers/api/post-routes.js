const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log(req.session);
  
  Post.findAll({
    attributes: [
      'id',
      'name',
      'date_favorite',
      'url',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Favorite,
        attributes: ['id', 'name', 'date_favorite', 'user_id', 'url'],
        include: {
          model: User,
          attributes: ['id']
        }
      },
      {
        model: User,
        attributes: ['id']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    let date_favorite = dbPostData.map(post => post.get({ plain:true })); 
    res.render ('main', { post, loggedIn: req.session.loggedIn })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
        'id',
        'name',
        'date_favorite',
        'url',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'name', 'date_favorite', 'user_id', 'url'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;