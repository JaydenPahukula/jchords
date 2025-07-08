import { FC } from 'react';
import { DialogType } from 'src/enums/dialogtype';
import { DialogProps } from 'src/types/dialog/dialogprops';

export type DialogManifest = { type: DialogType; component: FC<DialogProps> }[];
