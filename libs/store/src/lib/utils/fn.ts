import * as _ from 'lodash';

export const findByName = (name: string, limit?: number) => {
  return (items: { name: string }[]) => {
    const results = _.filter(items, function (item) {
      return item.name.indexOf(name) > -1;
    });

    return limit ? _.slice(results, 0, limit) : results;
  };
};

export const findByAttribute = (key: string, value: any, limit?: number) => {
  return (items: any[]) => {
    const results = _.filter(items, function (item) {
      return item[key] === value;
    });

    return limit ? _.slice(results, 0, limit) : results;
  };
};
