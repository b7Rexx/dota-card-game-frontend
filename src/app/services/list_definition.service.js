class ListDefinitionServiceFunc {
  constructor() {
    'ngInject';
  }

  getListDefinition(title, tableDefn) {
    return {
      title: title,
      tableDefn: tableDefn
    };
  }
}

const ListDefinitionService = {
  selector: 'ListDefinitionService',
  service: ListDefinitionServiceFunc
};

export default ListDefinitionService;
