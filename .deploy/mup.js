module.exports = {
  servers: {
    one: {
      host: '128.199.96.46',
      username: 'root',
      // pem:
      password: 'shadowfiend38'
      // or leave blank for authenticate from ssh-agent
    }
  },
//test webhook
  meteor: {
    name: 'nudmhor',
    path: '/var/lib/jenkins/workspace/NudMhorWebApp/.deploy',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    docker: {
      //image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base' // use this image if using Meteor 1.4+
    },
    env: {
      //ROOT_URL: '128.199.96.46',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
