import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const seed = async () => {
  const userProfile = await prisma.userProfile.create({
    data: {
      firstName: 'Juan',
      lastName: 'B',
      userName: 'juanb',
    },
  });

  const userProfile2 = await prisma.userProfile.create({
    data: {
      firstName: 'Cristian',
      lastName: 'G',
      userName: 'cristiang',
    },
  });

  await prisma.user.createMany({
    data: [
      {
        id: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
        email: 'test@test.com',
        auth0Id: 'google-oauth2|116916332888683556306',
        profileId: userProfile.id,
      },
      {
        id: 'e332f468-1bd1-4ea4-84f0-11865080d7c6',
        email: 'test2@test.com',
        auth0Id: 'auth0|5e9f8f8f9c9d450b1c0c8f0c',
        profileId: userProfile2.id,
      },
    ],
  });

  const articles = [
    {
      id: 'e432f468-1bd1-4ea4-84f0-11865080d6c6',
      title: 'Las fotos de Kiev y la guerra',
      content: [
        {
          level1:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a euismod tortor, quis faucibus tellus. Nunc a risus faucibus, eleifend turpis eu, varius mauris. Nullam efficitur magna non ipsum hendrerit convallis. Quisque elit est, malesuada et consectetur blandit, efficitur sit.',
          level2:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          level3:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          level1:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a euismod tortor, quis faucibus tellus. Nunc a risus faucibus, eleifend turpis eu, varius mauris. Nullam efficitur magna non ipsum hendrerit convallis. Quisque elit est, malesuada et consectetur blandit, efficitur sit.',
          level2:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          level3:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ],
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
    {
      id: 'e532f468-1bd1-4ea4-84f0-11865080d6c6',
      title: 'Los peligros de la pobreza en tiempos de guerra',
      content: [
        {
          level1:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a euismod tortor, quis faucibus tellus. Nunc a risus faucibus, eleifend turpis eu, varius mauris. Nullam efficitur magna non ipsum hendrerit convallis. Quisque elit est, malesuada et consectetur blandit, efficitur sit.',
          level2:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          level3:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          level1:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a euismod tortor, quis faucibus tellus. Nunc a risus faucibus, eleifend turpis eu, varius mauris. Nullam efficitur magna non ipsum hendrerit convallis. Quisque elit est, malesuada et consectetur blandit, efficitur sit.',
          level2:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          level3:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ],
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
  ];

  await prisma.article.create({
    data: {
      id: articles[0].id,
      title: 'Los peligros de la pobreza en tiempos de guerra',
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
      articleContent: {
        createMany: {
          data: [
            {
              level1: articles[0].content[0].level1,
              level2: articles[0].content[0].level2,
              level3: articles[0].content[0].level3,
            },
            {
              level1: articles[0].content[1].level1,
              level2: articles[0].content[1].level2,
              level3: articles[0].content[1].level3,
            },
          ],
        },
      },
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        id: 'e332f461-1bd1-4ea4-84f0-11865080d6c6',
        authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
        articleId: 'e432f468-1bd1-4ea4-84f0-11865080d6c6',
        content: `Jaja, hay de todo. Mis suegros tienen cinco gatos (tres machos y dos hembras).
          Una de las gatas te busca y se deja acariciar pero es re celosa y se ofende cuando interactuás con otros gatos.
          La otra gata es cagona e irritable y, si bien a veces se te refriega, tocarla es arriesgarte a que te cague a palos
          (con sus hermosas garras). Uno de los gatos es un fantasma, aparece poco y a lo sumo se va a acostar cerca tuyo,
          pero si lo tocás (o se da cuenta que vas a hacerlo) se va. Otro de los gatos es un crack social con los humanos,
          se deja acariciar por todos lados y es lo más parecido a un peluche (nunca se enoja con un humano o lo ataca),
          pero es un bully con los demás gatos y los caga a palos si no lo controlás. El último gato es el más equilibrado y
          se deja acariciar sin drama, pero es más probable que ande por afuera vigilando la zona y solo se acerque a vos en presencia de comida.`,
        parentCommentId: null,
      },
      {
        id: 'e332f468-1bd1-4ea4-84f0-11865080d6c7',
        authorId: 'e332f468-1bd1-4ea4-84f0-11865080d7c6',
        articleId: 'e432f468-1bd1-4ea4-84f0-11865080d6c6',
        content: `Jaja, hay de todo. Mis suegros tienen cinco gatos (tres machos y dos hembras).`,
        parentCommentId: 'e332f461-1bd1-4ea4-84f0-11865080d6c6',
      },
      {
        id: 'e332f468-1bd1-4ea4-84f0-11865080d6c8',
        authorId: 'e332f468-1bd1-4ea4-84f0-11865080d7c6',
        articleId: 'e432f468-1bd1-4ea4-84f0-11865080d6c6',
        content: `Alto perfil gatológico te mandaste, ja.`,
        parentCommentId: 'e332f461-1bd1-4ea4-84f0-11865080d6c6',
      },
      {
        id: 'e332f468-1bd1-4ea4-84f0-11865080d6c9',
        authorId: 'e332f468-1bd1-4ea4-84f0-11865080d7c6',
        articleId: 'e432f468-1bd1-4ea4-84f0-11865080d6c6',
        content: `Tengo tres michis y los tres se comportan diferente, pero confirmo por uno de ellos`,
        parentCommentId: null,
      },
    ],
  });
};

(async function () {
  try {
    await seed();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
