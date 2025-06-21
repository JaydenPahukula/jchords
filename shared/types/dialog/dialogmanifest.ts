import { FC } from 'react';
import { DialogType } from 'shared/enums/dialogtype';
import { DialogProps } from 'shared/types/dialog/dialogprops';

export type DialogManifest = { type: DialogType; component: FC<DialogProps> }[];
