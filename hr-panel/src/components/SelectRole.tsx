import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { useState } from "react";
import { Role } from "../lib/gql-codegen/graphql";

type SelectRoleProps = Exclude<SelectProps, 'children' | 'defaultValue' | 'value' | 'onChange'>;

export default function SelectRole({ defaultValue, value, onChange, ...props }: SelectRoleProps) {
  const [roles, setRoles] = useState<Array<Role>>([Role.Employee]);

  const handleChange = (event: SelectChangeEvent<typeof roles>) => {
    const { target: { value } } = event;
    setRoles(typeof value === 'string' ? value.split(',') as Array<Role> : value);
  };

  return (
    <Select
      multiple
      MenuProps={{ MenuListProps: { disablePadding: true } }}
      {...props}
      value={roles}
      onChange={handleChange}
      renderValue={set => roles.filter((role) => set.includes(role)).join(', ')}
    >
      {Object.values(Role).map(role => (
        <MenuItem key={role} value={role}>
          <Checkbox checked={roles.includes(role)} />
          {role}
        </MenuItem>
      ))}
    </Select>
  );
}
