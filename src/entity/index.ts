import { Categories } from './category.entity';
import { Events } from './event.entity';
import { Photos } from './photo.entity';
import { People } from './people.entity';
import { Roles } from './roles.entity';

const entities = [People, Events, Categories, Photos, Roles];

export { People, Events, Categories, Photos };
export default entities;
