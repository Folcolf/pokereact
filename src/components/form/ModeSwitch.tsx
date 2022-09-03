import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/stores';
import { changeMode } from '@/stores/reducer/darkModeReducer';
import { FormControlLabel, Switch, SxProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ModeSwitch = () => {
  const { t } = useTranslation();

  const mode = useAppSelector((state: RootState) => state.dark.value);
  const dispatch = useAppDispatch();

  const style: SxProps = {
    ['& span']: { maxWidth: '100%' },
  };

  return (
    <FormControlLabel
      value="start"
      control={
        <Switch
          color="primary"
          checked={mode}
          value={mode}
          onChange={() => dispatch(changeMode(!mode))}
        />
      }
      label={t('mode')}
      labelPlacement="end"
      sx={style}
    />
  );
};

export { ModeSwitch };
