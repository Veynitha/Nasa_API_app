import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ itemsData, onChange, title, initValue }) {

  const [age, setAge] = React.useState(initValue);

  const handleChange = (event) => {
    const  selectedValue = event.target.value;
    setAge(event.target.value);
    onChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120, minHeight: 50, backgroundColor: "#F6F5FF", borderRadius: '0.5rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={title}
          onChange={handleChange}
        >
          {itemsData.map((item) => (
            <MenuItem key={item.value} value={item.value} className='font-black'><strong>{item.label}</strong></MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}