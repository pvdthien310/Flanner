import React, {
    useEffect,
    useState
} from 'react'

export const Linh1 = {
    _id: 1,
    name: 'Linh Nguyen',
    avatar: require('../TestData/avatar/linh1.jpg'),
}
export const Linh2 = {
    _id: 2,
    name: 'Khanh Linh',
    avatar: require('../TestData/avatar/linh2.jpg'),
}

export const messageData = [

    {
        _id: 6443636436,
        text: 'https://www.google.com.vn/',
        image:'',
        createdAt: new Date('September 29, 2021 20:02:00'),
        user: Linh1,
    },
    {
        _id: 1,
        text: 'I must ve called a thousand times to tell you Im sorry for everything that Ive done',
        image:'',
        createdAt: new Date('September 29, 2021 20:01:00'),
        user: Linh1,
    },

    {
        _id: 2,
        text: 'Hello from the other side!',
        image: '',
        createdAt: new Date('September 29, 2021 20:00:00'),
        user: Linh2,
    },

    {
        _id: 165,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyiB7uhehP8tLFkKcxrFLp6YbVwIoVMTEbFw&usqp=CAU',
        createdAt: new Date('September 29, 2021 7:50:00'),
        user: Linh2
    },

    {
        _id: 124,
        text: 'I ll with you from dusk till dawn',
        createdAt: new Date('September 29, 2021 7:49:00'),
        user: Linh2
    },

    {
        _id: 19888,
        text: 'I ll with you from dusk till dawn, baby im right here!',
        createdAt: new Date('September 29, 2021 7:39:00'),
        user: Linh1,
    },

    {
        _id: 'images',

        image: 'https://lifeplatform.eu/wp-content/uploads/2015/06/ocean-691140_12801-1024x682.jpg',
        createdAt: new Date('September 4, 2021 23:39:00'),
        user: Linh1,
    },

    {
        _id: 27,
        text: 'Hello, it is me!',
        createdAt: new Date('September 4, 2021 23:39:00'),
        user: Linh1,
    },

    {
        _id: 19,
        text: 'Well, you only need the light when it s burning low. Only miss the sun when it starts to snow. Only know you love her when you let her go https://www.youtube.com/watch?v=RBumgq5yVrA',
        createdAt: new Date('September 4, 2021 23:39:00'),
        user: Linh2,
    },

    {
        _id: 22,
        text: 'Only know youve been high when you re feeling low. Only hate the road when you re missing home. Only know you love her when you let her go',
        createdAt: new Date('September 4, 2021 20:34:00'),
        user: Linh1,
    },

    {
        _id: 111,
        text: 'Sur le long chemin. Tout blanc de neige blanche. Un vieux monsieur s avance. Avec sa canne dans la main',
        createdAt: new Date('September 4, 2021 20:34:00'),
        user: Linh2,
    },

    {
        _id: 244,
        text: 'Et tout là-haut le vent. Qui siffle dans les branches. Lui souffle la romance. Qu il chantait petit enfant ',
        createdAt: new Date('August 14, 2021 13:24:00'),
        user: Linh1,
    },

    {
        _id: 18,
        text: 'Vive le vent, vive le vent, Vive le vent dhiver',
        createdAt: new Date('August 14, 2021 03:24:00'),
        user: Linh2,
    },

    {
        _id: 255,
        text: 'Qui sen va sifflant, soufflant. Dans les grands sapins verts... Oh ! Vive le temps, vive le temps. Vive le temps dhiver. Boule de neige et jour de lan, Et bonne année grand-mère... ',
        createdAt: new Date('June 14, 2021 03:24:00'),
        user: Linh1,
    }
];