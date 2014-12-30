var config = {
  local: {
      host: 'localhost:3506',
      mode: 'local',
      port: '3506', 
      mongo: {
        'hostname': 'localhost',
        'port': 27017,
        'username': '',
        'password': '',
        'name': '',
        'db': 'mydb'
      }
   },
  production: {
      host: '',
      mode: 'production',
      port: '5000', 
      mongo: {
        'hostname': 'amir-HP-Pavilion-dv5-Notebook-PC',
        'port': 27017,
        'username': '',
        'password': '',
        'name': '',
        'db': 'Users'
      }
   }
};
module.exports=function(mode) {
  return config[process.argv[2] || mode] || config.local; 
}


