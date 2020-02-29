export default {
  getTemplateInformation(id) {
    switch (id) {
      case 'Default':
        return {
          name: 'default',
          useIcons: true,
          iconPrefix: 'fa fa-',
          images: [
            'car',
            'bug',
            'paw',
            'bomb',
            'gamepad',
            'diamond',
            'heart',
            'bell',
          ],
          folder: '',
        };
      case 'Animals':
        return {
          name: 'animals',
          useIcons: true,
          iconPrefix: 'fa fa-',
          images: [
            'dog',
            'cat',
            'fish',
            'dove',
            'horse',
            'hippo',
            'feather',
            'spider',
          ],
          folder: '',
        };
      case 'Harry Potter':
        return {
          name: 'harry-potter',
          useIcons: false,
          images: [
            'head',
            'deathly hallows',
            'heart',
            'sorting hat',
            'car',
            'dobby',
            'dumbledore',
            'hogwarts',
          ],
          folder: 'harry-potter',
        };
      case 'Harry Potter Extended':
        return {
          name: 'harry-potter',
          useIcons: false,
          images: [
            'head',
            'deathly hallows',
            'heart',
            'sorting hat',
            'car',
            'dobby',
            'dumbledore',
            'hogwarts',
            // extended
            'hogwarts-emblem',
            'no-good',
            'platform',
            'siluetes',
            'lego',
            'patronum',
            'snitch',
          ],
          folder: 'harry-potter',
        };
      case 'Disney':
        return {
          name: 'disney',
          useIcons: false,
          images: [
            'daisy duck',
            'donald duck',
            'golfos',
            'goofy',
            'mickey',
            'minnie',
            'pluto',
            'scrooge',
          ],
          folder: 'disney',
        };
      default:
        return [];
    }
  },
};
