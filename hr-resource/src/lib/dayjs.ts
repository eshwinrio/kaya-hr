import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);

export default dayjs;
