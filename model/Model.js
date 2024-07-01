import * as SQLite from 'expo-sqlite';

export class Model {
  constructor(){
      this.db = SQLite.openDatabase('db.db');
  }
    
  successCB(name){
      console.log("SQLiteStorage "+name+" success");
    }
    errorCB(name, err){
      console.log("SQLiteStorage "+name);
      console.log(err);
    }
  // save_data takes a single patameter that takes a javascript object with the following shape
  // var data = {
  //   time : int
  //   value: int
  //   name : text
  // }
  // Where time is a unix integer of the time of saving
  // value is the 1-10 integer value
  // name is the string for the name of the sympyom/indicator
  save_data(data) {
    console.log(data.time, data.name, data.value)
      this.db.transaction(
          tx => {
            tx.executeSql("create table if not exists data (time int, value int, name text, primary key (name, time));", 
            [],
            () => console.log('success, data table exists and is writeable'),
            () => console.log('error, database table failed to create'));
            tx.executeSql(
              "insert or replace into data (time, value, name) values (?, ?, ?)",
              [data.time - (86400 * 0), data.value, data.name],
              () => console.log('success, data written to data table'),
              (t, er) => console.log('error writing data to table.', er)
            );
          }
        );
      }
  // get_data_by_time
  // Takes a single parameter expected to be an integer representing the unix timestamp for a day
  // This returns all data from database matching this date.
  // The the data returns object with data in key:value pairs
  get_data_time(time) {
      return new Promise((resolve, reject) => { this.db.transaction(
        tx => {
          tx.executeSql(
            "select * from data where time = ?",
            [time],
            (_, { rows: { _array } }) => {
              resolve(_array)
            },
            () => {
              console.log("error fetching")
              reject({fail: true})
            }
          )
        }
      )
    });
  }
  get_data_time_range(start, end) {
    return new Promise((resolve, reject) => { this.db.transaction(
      tx => {
        tx.executeSql(
          "select * from data where time > ? and time < ?",
          [start, end],
          (_, { rows: { _array } }) => {
            resolve(_array)
          },
          () => {
            console.log("error fetching")
            reject({fail: true})
          }
        );
      });
    });
  }
  // TODO: build SQL statment to return data by name
  get_data_name(name){
    console.log(name)
    return new Promise((resolve, reject) => { this.db.transaction(
      tx => {
        tx.executeSql('Select * from data where name=?',[name],(tx, { rows: { _array } }) =>{
          var data = []
          for (var i in _array){
            data.push(_array[i].value)
          }
          var r = Math.floor(Math.random() * 255)
          var g = Math.floor(Math.random() * 255)
          var b = Math.floor(Math.random() * 255)
          resolve({data: data, name: name, color: (opacity = 1) => `rgba(${r}, ${g}, ${b}, ${opacity})`})
        },
        () => {
          console.log("error fetching")
          reject({fail: true})
          }
        );
      });
    });
  }
  // TODO: Build SQL statment to return data from tracking table
  get_tracking(name){
    console.log(name)
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql("create table if not exists tracking (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, desc text, scale text, type text);", 
              [],
              () => console.log('success, tracking table exists and is writeable'),
              () => console.log('error, database table failed to create')
          );
          tx.executeSql("select * from tracking where name = ?",
          [name],
          (_, { rows: { _array } })=>
          {
            resolve(_array)
          },() => console.log("error fetching"));
      });
    });
  }
    // TODO: Check if tracking table exists, then save data to tracking table, Need error handling!!!!
  save_tracking(tracking){
    this.db.transaction((tx) => {
      tx.executeSql("create table if not exists tracking (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, desc text, scale text, type text);", 
              [],
              () => console.log('success, tracking table exists and is writeable'),
              () => console.log('error, database table failed to create')
          );
      tx.executeSql("insert or replace into tracking (name, desc, scale, type) values (?, ?, ?, ?)",
      [tracking.name, tracking.desc, tracking.scale, tracking.type],
      () => console.log('success, data written to tracking table'),
      (txob, er) => console.log('error writing data to table.', er)
      );
    }
    )
  }
  // TODO: Get data from model by time and name keys. Generate SQL query based on time and name key
  get_data_time_name(day, name){
    return new Promise((resolve, reject) => { this.db.transaction(
      tx => {
        tx.executeSql(
          "select * from data where time = ? and name = ?",
          [day, name],
          (_, { rows: { _array } }) => {
            resolve(_array)
          },
          () => {
            console.log("error fetching")
            reject({fail: true})
          }
        );
      });
    });
  }
  get_data_time_range_name(start, end, name){
    return new Promise((resolve, reject) => { this.db.transaction(
      tx => {
        tx.executeSql(
          "select * from data where name = ? and time <= ? and time >= ?",
          [name, start, end],
          (_, { rows: { _array } }) => {
            var data = []
          for (var i in _array){
            data.push(_array[i].value)
          }
          var r = Math.floor(Math.random() * 150)
          var g = Math.floor(Math.random() * 150)
          var b = Math.floor(Math.random() * 255)
          resolve({data: data, name: name, color: (opacity = .1) => `rgba(${r}, ${g}, ${b}, ${opacity})`})
          },
          () => {
            console.log("error fetching")
            reject({fail: true})
          }
        );
      });
    });
  }
  drop_table(){
    this.db.transaction((tx) => {
      tx.executeSql("drop table tracking"), [], ()=> console.log('done'), ()=> console.log('Failed')
    })
  }
}
