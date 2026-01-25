import { ObjectField } from '@tinacms/schema-tools';

import { imageMediaTemplate } from '@/tina/templates/imageMediaTemplate';
import { videoMediaTemplate } from '@/tina/templates/videoMediaTemplate';

export const mediaField: ObjectField = {
  type: 'object',
  name: 'media',
  label: 'Media',
  list: true,
  ui: {
    validate: (items) => {
      if (Array.isArray(items) && items.length > 1) {
        return 'Only 1 media is allowed.';
      }
    },
  },
  templates: [imageMediaTemplate, videoMediaTemplate],
};
