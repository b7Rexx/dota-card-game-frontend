class ListDefinitionServiceFunc {
  constructor() {
    'ngInject';
  }

  /**
   * list defintion for list component 
   * @param {*} title 
   * @param {*} tableDefn 
   */
  getListDefinition(title, tableDefn) {
    return {
      title: title,
      tableDefn: tableDefn
    };
  }

  /**
   * column defintion for table in list 
   * @param {*} name 
   * @param {*} type 
   * @param {*} key 
   * @param {*} options  
   */
  getTableColumn(name, type, key, options={}) {
    let tableCol = { thead: name, tbody: key, type: type };
    if (options.action) tableCol.action = options.action;
    if (options.option) tableCol.option = options.option;
    if (options.imageFunc) tableCol.imageFunc = options.imageFunc;
    if (options.icon) tableCol.icon = options.icon;
    return tableCol;
  }
}

const ListDefinitionService = {
  selector: 'ListDefinitionService',
  service: ListDefinitionServiceFunc
};

export default ListDefinitionService;
