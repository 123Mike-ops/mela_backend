const { Client } = require('pg')
const dotenv=require('dotenv').config();

const client = new Client({
  "user": process.env.DB_USER,
  "host": process.env.DB_HOST,
  "database": process.env.DB_NAME,
  "password": process.env.DB_PASSWORD,
  "port": process.env.DB_PORT
})
module.exports = {
    async query (text, params)  {
      // invocation timestamp for the query method
      const start = Date.now();
      try {
          const res = await client.query(text, params);
          // time elapsed since invocation to execution
          const duration = Date.now() - start;
          console.log(
            'executed query', 
            {text, duration, rows: res.rowCount}
          );
          return res;
      } catch (error) {
          console.log('error in query', {text});
          throw error;
      }
    },
    // getClient: (callback) => {
    //   client.connect((err, clienT, done) => { 
    //     const query = clienT.query
   
    //     // monkey patch the query method to keep track of the last query executed
    //     clienT.query = (...args) => {
    //       clienT.lastQuery = args
    //       return query.apply(clienT, args)
    //     }
   
    //     // set a timeout of 5 seconds, after which we will log this client's last query
    //     const timeout = setTimeout(() => {
    //       console.error('A client has been checked out for more than 5 seconds!')
    //       console.error(`The last executed query on this client was: ${clienT.lastQuery}`)
    //     }, 5000)
   
    //     const release = (err) => {
    //       // call the actual 'done' method, returning this client to the pool
    //       done(err)
   
    //       // clear our timeout
    //       clearTimeout(timeout)
   
    //       // set the query method back to its old un-monkey-patched version
    //       clienT.query = query
    //     }
   
    //     callback(err, clienT, release)
    //   })
  // }
  };
module.exports=client; 