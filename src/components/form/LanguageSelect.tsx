import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

interface Options {
  [key: string]: {
    nativeName: string;
  };
}

const LanguageSelect = () => {
  const id = useId();
  const { i18n } = useTranslation();

  const lngs: Options = {
    en: { nativeName: 'English' },
    fr: { nativeName: 'Francais' },
  };

  const handleChange = (event: SelectChangeEvent) => {
    const str: string = event.target.value.toString();
    i18n.changeLanguage(str).then(() => {
      window.localStorage.setItem('lang', str);
    });
  };

  return (
    <FormControl>
      <InputLabel id="id">Language</InputLabel>
      <Select
        id={id}
        value={i18n.language}
        label="Language"
        onChange={handleChange}
      >
        {Object.keys(lngs).map((lng: string) => (
          <MenuItem key={lng} value={lng}>
            {lng}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { LanguageSelect };
