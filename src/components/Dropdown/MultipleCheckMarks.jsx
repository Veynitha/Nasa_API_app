import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ itemsData, onChange }) {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleChange = (event) => {
    const selectedValues = event.target.value;
    // setSelectedItems(selectedValues);
    onChange(selectedValues);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, backgroundColor: '#fff', borderRadius: '0.5rem' }}>
        <InputLabel id="demo-multiple-checkbox-label" className='font-bold'>Cameras</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {itemsData.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={selectedItems.indexOf(item.value) > -1} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
