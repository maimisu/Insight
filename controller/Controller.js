import { Model } from '../model/Model'
export class Controller {
    constructor(user) {
        this.moduledata = require('./modules/bipolar.json');
        this.data = [{'name':'none'}]
        this.tracking_list_bool = {};
        this.tracking_list = null;
        this.tracking = null;
        this.loading = true;
        this.res = null;
        this.user = user;
        this.model = new Model();
        this.first_time_setup();
        this.new_tracking = true;
        
    }
  addBool(name){
    var data = {}
    data.name=name
    data.bool=false
    return data
  }
  set_tracking_bool(){
    var temp = this.tracking_list.map((name) => {
      var data = {}
      data.name=name
      data.bool=false
      return data
    });
    this.tracking_list_bool = temp
  }
  get_tracking_bool(){
    return this.tracking_list_bool
  }
  get_tracking(){
    return this.tracking_list
  }
  // this should request the model to update the tracking table with new values.
  check_tracking(){
    if (this.model.tracking != null){
      this.state = 'Done'
    }
  }
  get_all_module(){
    var data = []
    for (var i in this.moduledata){
      data.push(this.moduledata[i]["name"])
    }
    return data
  }
  async update_tracking(name){
    var data = await this.model.get_tracking(name)
    this.data = data
    return data
  }

  handleChange(name){
    var temp  = this.tracking_list_bool.map((check) => {
      if (name == check.name){
        return { ...check, bool: !check.bool}
      }
      return check
    })
    this.tracking_list_bool = temp
  }
  first_time_setup(){
    var data = ['Caffeine', 'Dream Intensity', 'Relationship Health', 'Stress', 'Appetite', 'Distractibility', 'Personal Hygiene', 'Energy', 'Exercise', 'Sugar Intake']
    var masterData = []
    for (var i in this.moduledata){
      masterData.push(this.moduledata[i]["name"])
    }
    this.tracking = masterData
    this.tracking_list = data
    this.set_tracking_bool()
    this.model.drop_table()
    this.save_tracking_list()
  }
  // save_data takes a single patameter that takes a javascript object with the following shape
  // var data = {
  //   time: int
  //   value:int
  //   name: text
  // }
  // Where time is a unix integer of the time of saving
  // value is the 1-10 integer value
  // name is the string for the name of the sympyom/indicator
  save_graph_data(data){
    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
    data.time = startOfDay;
    this.model.save_data(data);
  }
  get_today_epoch(){
    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
    return startOfDay;
  }
  // takes a single days argument as an int. 
  // returns the epoch start of day x days in past.
  get_previous_days_epoch(days){
    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
    return startOfDay - 86400 * days;
  }
  generate_date_labels_str(start, end){
    var data = []
    while (end <= start){
      var date = new Date(end * 1000);
      var month = (date.getMonth() + 1).toString().padStart(2, '0');
      var day = date.getDate().toString().padStart(2, '0');
      data.push(month + '/' + day)
      end = end + 86400
    }
    return data
  }
  get_date_label(days){
    if (days == 0){
      end = this.get_today_epoch();
    }
    else{
      end = this.get_previous_days_epoch(days);
    }
    // var end = this.get_previous_days_epoch(days);
    var start = this.get_today_epoch();
    var data = this.generate_date_labels_str(start, end)
    return data
  }
   // TODO this function should return a dict like object that contains the information for labels and the dataset for the graphs.
  // According to graphing page, lables is a list object i.e labels:['Monday','Tuesday']
  // Datasets is a list of dictionaries i.e datasets: [{data: [7,7,8,5,2,7,6],}
  // the return type = javascript object: {lables: [], datatsets: [{data1: []}, {data2: []},] }
  get_graph_by_range_name(days, names) {
    start = this.get_today_epoch();
     if (days == 0){
      end = this.get_today_epoch();
    }
    else{
      end = this.get_previous_days_epoch(days);
    }
    this.loading = true;
    return Promise.all(names.map(name =>this.model.get_data_time_range_name(start, end, name)));
  }
  get_graph_by_name(names){
    this.loading = true;
    return Promise.all(names.map(name =>this.model.get_data_name(name)));
  }
  async get_graph_by_range(days){
    start = this.get_today_epoch();
    end = this.get_previous_days_epoch(days);
    this.loading = true;
    var data = await this.model.get_data_time_range(start, end);
    this.data = data;
    return data;
  }
  async get_graph_day_name(days, name){
    day = this.get_previous_days_epoch(days);
    this.loading = true;
    var data = await this.model.get_data_time_name(day, name);
    this.data = data;
    return data;
  }
  async get_graph_by_day(days){
    day = this.get_previous_days_epoch(days);
    this.loading = true;
    var data = await this.model.get_data_time(day);
    this.data = data;
    return data;
  }
  save_tracking_list(){
    for (var item in this.tracking){
      data = {};
      data["name"] = this.moduledata[this.tracking[item]]["name"];
      data["scale"] = this.moduledata[this.tracking[item]]["scale"];
      data["desc"] = this.moduledata[this.tracking[item]]["desc"];
      data["type"] = this.moduledata[this.tracking[item]]["type"];

      this.model.save_tracking(data);
    }
  }
  set_tracking_list(data){
    this.tracking_list = data;
    this.set_tracking_bool()
  }
}

export var con = new Controller
