import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movies = [
  {
    slug: "the-shawshank-redemption",
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    releaseDate: new Date("1994-09-23"),
    genre: "drama",
    voteAverage: 8.7,
    cast: [
      { name: "Tim Robbins", character: "Andy Dufresne" },
      { name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding" },
      { name: "Bob Gunton", character: "Warden Norton" },
    ],
  },
  {
    slug: "the-godfather",
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    releaseDate: new Date("1972-03-14"),
    genre: "drama",
    voteAverage: 8.7,
    cast: [
      { name: "Marlon Brando", character: "Don Vito Corleone" },
      { name: "Al Pacino", character: "Michael Corleone" },
      { name: "James Caan", character: "Sonny Corleone" },
    ],
  },
  {
    slug: "inception",
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    releaseDate: new Date("2010-07-15"),
    genre: "sci-fi",
    voteAverage: 8.4,
    cast: [
      { name: "Leonardo DiCaprio", character: "Cobb" },
      { name: "Joseph Gordon-Levitt", character: "Arthur" },
      { name: "Elliot Page", character: "Ariadne" },
    ],
  },
  {
    slug: "the-dark-knight",
    title: "The Dark Knight",
    overview:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    releaseDate: new Date("2008-07-16"),
    genre: "action",
    voteAverage: 9.0,
    cast: [
      { name: "Christian Bale", character: "Bruce Wayne / Batman" },
      { name: "Heath Ledger", character: "Joker" },
      { name: "Aaron Eckhart", character: "Harvey Dent" },
    ],
  },
  {
    slug: "pulp-fiction",
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    releaseDate: new Date("1994-10-14"),
    genre: "drama",
    voteAverage: 8.5,
    cast: [
      { name: "John Travolta", character: "Vincent Vega" },
      { name: "Samuel L. Jackson", character: "Jules Winnfield" },
      { name: "Uma Thurman", character: "Mia Wallace" },
    ],
  },
  {
    slug: "the-matrix",
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    releaseDate: new Date("1999-03-30"),
    genre: "sci-fi",
    voteAverage: 8.2,
    cast: [
      { name: "Keanu Reeves", character: "Neo" },
      { name: "Laurence Fishburne", character: "Morpheus" },
      { name: "Carrie-Anne Moss", character: "Trinity" },
    ],
  },
  {
    slug: "interstellar",
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    releaseDate: new Date("2014-11-05"),
    genre: "sci-fi",
    voteAverage: 8.4,
    cast: [
      { name: "Matthew McConaughey", character: "Cooper" },
      { name: "Anne Hathaway", character: "Brand" },
      { name: "Jessica Chastain", character: "Murph" },
    ],
  },
  {
    slug: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    overview:
      "In a post-apocalyptic wasteland, Max teams up with a mysterious woman to flee a tyrannical warlord.",
    posterUrl: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    releaseDate: new Date("2015-05-13"),
    genre: "action",
    voteAverage: 7.6,
    cast: [
      { name: "Tom Hardy", character: "Max Rockatansky" },
      { name: "Charlize Theron", character: "Imperator Furiosa" },
      { name: "Nicholas Hoult", character: "Nux" },
    ],
  },
  {
    slug: "parasite",
    title: "Parasite",
    overview:
      "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    releaseDate: new Date("2019-05-30"),
    genre: "drama",
    voteAverage: 8.5,
    cast: [
      { name: "Song Kang-ho", character: "Kim Ki-taek" },
      { name: "Lee Sun-kyun", character: "Park Dong-ik" },
      { name: "Cho Yeo-jeong", character: "Choi Yeon-gyo" },
    ],
  },
  {
    slug: "spirited-away",
    title: "Spirited Away",
    overview:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by spirits.",
    posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    releaseDate: new Date("2001-07-20"),
    genre: "animation",
    voteAverage: 8.5,
    cast: [
      { name: "Rumi Hiiragi", character: "Chihiro (voice)" },
      { name: "Miyu Irino", character: "Haku (voice)" },
      { name: "Mari Natsuki", character: "Yubaba (voice)" },
    ],
  },
  {
    slug: "your-name",
    title: "Your Name",
    overview:
      "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    posterUrl: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONNbF.jpg",
    releaseDate: new Date("2016-08-26"),
    genre: "animation",
    voteAverage: 8.4,
    cast: [
      { name: "Ryunosuke Kamiki", character: "Taki (voice)" },
      { name: "Mone Kamishiraishi", character: "Mitsuha (voice)" },
    ],
  },
  {
    slug: "blade-runner-2049",
    title: "Blade Runner 2049",
    overview:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    releaseDate: new Date("2017-10-06"),
    genre: "sci-fi",
    voteAverage: 7.6,
    cast: [
      { name: "Ryan Gosling", character: "K" },
      { name: "Harrison Ford", character: "Rick Deckard" },
      { name: "Ana de Armas", character: "Joi" },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.watchlistItem.deleteMany();
  await prisma.movie.deleteMany();

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
    console.log(`  ✓ ${movie.title}`);
  }

  console.log(`\nSeeded ${movies.length} movies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
