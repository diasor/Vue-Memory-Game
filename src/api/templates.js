export default {
  getTemplateInformation(id) {
    switch (id) {
      case 'Default':
        return {
          name: 'default',
          useIcons: true,
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
