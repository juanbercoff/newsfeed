import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const seed = async () => {
  const articles = [
    {
      title: 'Las fotos de Kiev y la guerra',
      content:
        'La fotoperiodista Lynsey Addario de The New York Times tomó y ' +
        'difundió la espeluznante imagen que sirve como evidencia contundente e irrefutable de' +
        'que las tropas rusas están masacrando civiles que sólo buscaban escapar de la violencia. ' +
        'En la foto se ven cuatro cuerpos, maletas listas para huir y sangre. Tendidos están los restos' +
        'sin vida de una madre, su hijo adolescente y su hija pequeña. El padre, aún con vida pero gravemente' +
        'herido, apenas respira. Los mató un ataque ruso cuando intentaban huir de Irpen, a 20 kilómetros de Kiev' +
        '. Los tres miembros de esta familia ucraniana fueron asesinados este domingo en medio de una ráfaga de ' +
        'proyectiles de mortero contra un puente maltrecho utilizado por quienes huyen de los combates.' +
        'Allí, centenares de personas se habían agrupado sobre el río Irpin desde el sábado pasado buscando' +
        'una salida al horror. Addario cuenta que para cruzar, los civiles lo intentaban en pequeños grupos.' +
        'Mientras una decena de soldados ucranianos los asistía… Todos iban cargados con lo poco que se animaron' +
        'a transportar en la huida. Pero el ataque comenzó. Las granadas de mortero cayeron primero a unos 100 metros' +
        'del puente, y luego se desplazaron en una serie de estruendosas explosiones hacia una sección de la calle' +
        'donde la gente huía. A medida que los morteros se acercaban a la columna de civiles, la gente corría,' +
        'arrastrando niños, tratando de encontrar un lugar seguro. Pero no había nada para protegerse. No había' +
        'ningún lugar donde esconderse… Y esta familia de cuatro quedó atrapada. Los soldados se apresuraron a ayudar,' +
        'pero la mujer y los niños estaban muertos. El padre aún tenía pulso pero estaba inconsciente y gravemente' +
        'herido. Su equipaje, una maleta plateada con ruedas y algunas mochilas estaba desperdigadas en el asfalto, ' +
        'junto con un maletín verde para un pequeño perro que ladraba.',
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
    {
      title: 'Los peligros de la pobreza en tiempos de guerra',
      content:
        'La fotoperiodista Lynsey Addario de The New York Times tomó y ' +
        'difundió la espeluznante imagen que sirve como evidencia contundente e irrefutable de' +
        'que las tropas rusas están masacrando civiles que sólo buscaban escapar de la violencia. ' +
        'En la foto se ven cuatro cuerpos, maletas listas para huir y sangre. Tendidos están los restos' +
        'sin vida de una madre, su hijo adolescente y su hija pequeña. El padre, aún con vida pero gravemente' +
        'herido, apenas respira. Los mató un ataque ruso cuando intentaban huir de Irpen, a 20 kilómetros de Kiev' +
        '. Los tres miembros de esta familia ucraniana fueron asesinados este domingo en medio de una ráfaga de ' +
        'proyectiles de mortero contra un puente maltrecho utilizado por quienes huyen de los combates.' +
        'Allí, centenares de personas se habían agrupado sobre el río Irpin desde el sábado pasado buscando' +
        'una salida al horror. Addario cuenta que para cruzar, los civiles lo intentaban en pequeños grupos.' +
        'Mientras una decena de soldados ucranianos los asistía… Todos iban cargados con lo poco que se animaron' +
        'a transportar en la huida. Pero el ataque comenzó. Las granadas de mortero cayeron primero a unos 100 metros' +
        'del puente, y luego se desplazaron en una serie de estruendosas explosiones hacia una sección de la calle' +
        'donde la gente huía. A medida que los morteros se acercaban a la columna de civiles, la gente corría,' +
        'arrastrando niños, tratando de encontrar un lugar seguro. Pero no había nada para protegerse. No había' +
        'ningún lugar donde esconderse… Y esta familia de cuatro quedó atrapada. Los soldados se apresuraron a ayudar,' +
        'pero la mujer y los niños estaban muertos. El padre aún tenía pulso pero estaba inconsciente y gravemente' +
        'herido. Su equipaje, una maleta plateada con ruedas y algunas mochilas estaba desperdigadas en el asfalto, ' +
        'junto con un maletín verde para un pequeño perro que ladraba.',
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
    {
      title: 'Generalizando los problemas de la pobreza',
      content:
        'La fotoperiodista Lynsey Addario de The New York Times tomó y ' +
        'difundió la espeluznante imagen que sirve como evidencia contundente e irrefutable de' +
        'que las tropas rusas están masacrando civiles que sólo buscaban escapar de la violencia. ' +
        'En la foto se ven cuatro cuerpos, maletas listas para huir y sangre. Tendidos están los restos' +
        'sin vida de una madre, su hijo adolescente y su hija pequeña. El padre, aún con vida pero gravemente' +
        'herido, apenas respira. Los mató un ataque ruso cuando intentaban huir de Irpen, a 20 kilómetros de Kiev' +
        '. Los tres miembros de esta familia ucraniana fueron asesinados este domingo en medio de una ráfaga de ' +
        'proyectiles de mortero contra un puente maltrecho utilizado por quienes huyen de los combates.' +
        'Allí, centenares de personas se habían agrupado sobre el río Irpin desde el sábado pasado buscando' +
        'una salida al horror. Addario cuenta que para cruzar, los civiles lo intentaban en pequeños grupos.' +
        'Mientras una decena de soldados ucranianos los asistía… Todos iban cargados con lo poco que se animaron' +
        'a transportar en la huida. Pero el ataque comenzó. Las granadas de mortero cayeron primero a unos 100 metros' +
        'del puente, y luego se desplazaron en una serie de estruendosas explosiones hacia una sección de la calle' +
        'donde la gente huía. A medida que los morteros se acercaban a la columna de civiles, la gente corría,' +
        'arrastrando niños, tratando de encontrar un lugar seguro. Pero no había nada para protegerse. No había' +
        'ningún lugar donde esconderse… Y esta familia de cuatro quedó atrapada. Los soldados se apresuraron a ayudar,' +
        'pero la mujer y los niños estaban muertos. El padre aún tenía pulso pero estaba inconsciente y gravemente' +
        'herido. Su equipaje, una maleta plateada con ruedas y algunas mochilas estaba desperdigadas en el asfalto, ' +
        'junto con un maletín verde para un pequeño perro que ladraba.',
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
    {
      title: 'Los mejores maletines por menos de 100 pesos',
      content:
        'La fotoperiodista Lynsey Addario de The New York Times tomó y ' +
        'difundió la espeluznante imagen que sirve como evidencia contundente e irrefutable de' +
        'que las tropas rusas están masacrando civiles que sólo buscaban escapar de la violencia. ' +
        'En la foto se ven cuatro cuerpos, maletas listas para huir y sangre. Tendidos están los restos' +
        'sin vida de una madre, su hijo adolescente y su hija pequeña. El padre, aún con vida pero gravemente' +
        'herido, apenas respira. Los mató un ataque ruso cuando intentaban huir de Irpen, a 20 kilómetros de Kiev' +
        '. Los tres miembros de esta familia ucraniana fueron asesinados este domingo en medio de una ráfaga de ' +
        'proyectiles de mortero contra un puente maltrecho utilizado por quienes huyen de los combates.' +
        'Allí, centenares de personas se habían agrupado sobre el río Irpin desde el sábado pasado buscando' +
        'una salida al horror. Addario cuenta que para cruzar, los civiles lo intentaban en pequeños grupos.' +
        'Mientras una decena de soldados ucranianos los asistía… Todos iban cargados con lo poco que se animaron' +
        'a transportar en la huida. Pero el ataque comenzó. Las granadas de mortero cayeron primero a unos 100 metros' +
        'del puente, y luego se desplazaron en una serie de estruendosas explosiones hacia una sección de la calle' +
        'donde la gente huía. A medida que los morteros se acercaban a la columna de civiles, la gente corría,' +
        'arrastrando niños, tratando de encontrar un lugar seguro. Pero no había nada para protegerse. No había' +
        'ningún lugar donde esconderse… Y esta familia de cuatro quedó atrapada. Los soldados se apresuraron a ayudar,' +
        'pero la mujer y los niños estaban muertos. El padre aún tenía pulso pero estaba inconsciente y gravemente' +
        'herido. Su equipaje, una maleta plateada con ruedas y algunas mochilas estaba desperdigadas en el asfalto, ' +
        'junto con un maletín verde para un pequeño perro que ladraba.',
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
    {
      title: 'Implementando un sistema de seguridad para 40.000 personas',
      content:
        'La fotoperiodista Lynsey Addario de The New York Times tomó y ' +
        'difundió la espeluznante imagen que sirve como evidencia contundente e irrefutable de' +
        'que las tropas rusas están masacrando civiles que sólo buscaban escapar de la violencia. ' +
        'En la foto se ven cuatro cuerpos, maletas listas para huir y sangre. Tendidos están los restos' +
        'sin vida de una madre, su hijo adolescente y su hija pequeña. El padre, aún con vida pero gravemente' +
        'herido, apenas respira. Los mató un ataque ruso cuando intentaban huir de Irpen, a 20 kilómetros de Kiev' +
        '. Los tres miembros de esta familia ucraniana fueron asesinados este domingo en medio de una ráfaga de ' +
        'proyectiles de mortero contra un puente maltrecho utilizado por quienes huyen de los combates.' +
        'Allí, centenares de personas se habían agrupado sobre el río Irpin desde el sábado pasado buscando' +
        'una salida al horror. Addario cuenta que para cruzar, los civiles lo intentaban en pequeños grupos.' +
        'Mientras una decena de soldados ucranianos los asistía… Todos iban cargados con lo poco que se animaron' +
        'a transportar en la huida. Pero el ataque comenzó. Las granadas de mortero cayeron primero a unos 100 metros' +
        'del puente, y luego se desplazaron en una serie de estruendosas explosiones hacia una sección de la calle' +
        'donde la gente huía. A medida que los morteros se acercaban a la columna de civiles, la gente corría,' +
        'arrastrando niños, tratando de encontrar un lugar seguro. Pero no había nada para protegerse. No había' +
        'ningún lugar donde esconderse… Y esta familia de cuatro quedó atrapada. Los soldados se apresuraron a ayudar,' +
        'pero la mujer y los niños estaban muertos. El padre aún tenía pulso pero estaba inconsciente y gravemente' +
        'herido. Su equipaje, una maleta plateada con ruedas y algunas mochilas estaba desperdigadas en el asfalto, ' +
        'junto con un maletín verde para un pequeño perro que ladraba.',
      authorId: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
    },
  ];

  await prisma.user.create({
    data: {
      id: 'e332f468-1bd1-4ea4-84f0-11865080d6c6',
      username: 'testuser',
      email: 'test@test.com',
      password: 'passowrd',
    },
  });

  await prisma.article.createMany({ data: articles });
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
