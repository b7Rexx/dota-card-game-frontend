/**
 *List definition example 
  *this.listDefn ={
  title: 'list title',
  tableDefn: [
  {
    thead: 'SN', //table head name
    tbody: 'id', //table body api key for type string | name for type button
    type: 'string', //data type (string,button,status)
    icon: 'fa fa-edit', //font awesome icon when type button
    action: null // null or callback function
  },
]}
 */

class HeroController {
  constructor() {
    'ngInject';
    //default table definition
    this.listDefn = {
      title: 'list title',
      tableDefn: [
        { thead: 'SN', tbody: 'id', type: 'string', action: null },
        { thead: 'Name', tbody: 'name', type: 'string', action: null },
        // { thead: 'Action', icon: 'fa fa-edit', type: 'button', action: this.cbFunc },
      ]
    };
  }
}

const HeroComponent = {
  selector: 'listComponent',
  controller: HeroController,
  template: require('../template/list.template.html'),
  bindings: {
    listDefn: '<',
    tableData: '<'
  }
};

export default HeroComponent;
