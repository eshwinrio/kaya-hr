import { useQuery } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { LOAD_ROLES } from "../lib/gql-queries";

type SelectRoleProps = Exclude<SelectProps, 'children' | 'defaultValue' | 'value' | 'onChange'>;

export default function SelectRole({ defaultValue, value, onChange, ...props }: SelectRoleProps) {
  const { data, loading } = useQuery(LOAD_ROLES);
  const [roleIds, setRoleIds] = useState<Array<number>>(data?.roles.length ? [data.roles[0].id] : []);

  if (loading) return (
    <Skeleton variant="rectangular" />
  );

  const handleChange = (event: SelectChangeEvent<typeof roleIds>) => {
    const { target: { value } } = event;
    setRoleIds(typeof value === 'string' ? value.split(',').map(Number) : value);
  };

  return (
    <Select
      multiple
      MenuProps={{ MenuListProps: { disablePadding: true } }}
      {...props}
      value={roleIds}
      onChange={handleChange}
      renderValue={set => data?.roles.filter((role) => set.includes(role.id)).map((role) => role.title).join(', ')}
    >
      {data?.roles.map((role) => (
        <MenuItem key={role.code} value={role.id}>
          <Checkbox checked={roleIds.includes(role.id)} />
          {role.title}
        </MenuItem>
      ))}
    </Select>
  );
}
