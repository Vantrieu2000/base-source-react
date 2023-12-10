import errors from './errors';
import pages from './pages';
import permission from './permission';
import success from './success';
import system from './system';
import title from './title';
import validate from './validate';
import component from './component';

export default {
  ...pages,
  ...permission,
  ...validate,
  ...system,
  ...title,
  ...errors,
  ...success,
  ...component
};
