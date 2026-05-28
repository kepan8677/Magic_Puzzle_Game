// XX Puzzle Party — Blue Bear Calendar (13 levels)
//
// Each level uses one of the calendar illustrations. Image files live in
// puzzle-party/levels/level-01.jpg … level-13.jpg
//
// Drop your own images in there with the matching filenames and they appear
// automatically. The puzzle code auto-crops each image to a centered square,
// so portrait/landscape originals all work fine.

const BLUE_BEAR_LEVELS = [
  { id:1,  name:'Cover',     subtitle:'我和大蓝熊 · 2026',   image:'levels/level-01.jpg' },
  { id:2,  name:'January',   subtitle:'Magic Raindrops',   image:'levels/level-02.jpg' },
  { id:3,  name:'February',  subtitle:'Mushroom Garden',   image:'levels/level-03.jpg' },
  { id:4,  name:'March',     subtitle:'The Crown',         image:'levels/level-04.jpg' },
  { id:5,  name:'April',     subtitle:'Lamb on Mushroom',  image:'levels/level-05.jpg' },
  { id:6,  name:'May',       subtitle:'Spring Walk',       image:'levels/level-06.jpg' },
  { id:7,  name:'June',      subtitle:'Warm Hug',          image:'levels/level-07.jpg' },
  { id:8,  name:'July',      subtitle:'Mushroom Hat',      image:'levels/level-08.jpg' },
  { id:9,  name:'August',    subtitle:'Rose Embrace',      image:'levels/level-09.jpg' },
  { id:10, name:'September', subtitle:'Sweet Dreams',      image:'levels/level-10.jpg' },
  { id:11, name:'October',   subtitle:'Peacock & Pond',    image:'levels/level-11.jpg' },
  { id:12, name:'November',  subtitle:'Goodnight Bear',    image:'levels/level-12.jpg' },
  { id:13, name:'December',  subtitle:'Candlelit Dinner',  image:'levels/level-13.jpg' },
];

// Expose under both names (kept old name for backward compatibility with app.js)
window.BLUE_BEAR_LEVELS = BLUE_BEAR_LEVELS;
window.SLAM_DUNK_LEVELS = BLUE_BEAR_LEVELS;
