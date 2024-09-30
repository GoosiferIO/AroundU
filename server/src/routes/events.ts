import buildRoutes from '@/utils/buildRoutes';

import { processPostEvents, processGetEvents } from '@/controllers/events';
import { validatePostEvents, validateGetEvents } from '@/validators/events';

const eventsRoutes = buildRoutes([
  {
    method: 'post',
    path: '/events',
    validator: validatePostEvents,
    middleware: [],
    controller: processPostEvents,
  },
  {
    method: 'get',
    path: '/events',
    validator: processGetEvents,
    middleware: [],
    controller: validateGetEvents,
  },
]);

export default eventsRoutes;
