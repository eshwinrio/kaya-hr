import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List, { ListProps } from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";

export interface DashboardMenuItem {
  readonly title: string;
  readonly description?: string;
  readonly icon: JSX.Element;
  readonly path: string;
  readonly children?: DashboardMenuItem[];
}

export interface DashboardMenuProps extends ListProps {
  readonly menus: DashboardMenuItem[];
}

const DashboardMenu: FC<DashboardMenuProps> = ({ menus, ...props }) => {
  const [collapsedItems, setCollapsedItems] = useState<string[]>([]);

  const handleCollapse = (menuId: string) => {
    setCollapsedItems((prevItems) =>
      prevItems.includes(menuId)
        ? prevItems.filter((id) => id !== menuId)
        : [...prevItems, menuId]
    );
  };

  return (
    <List
      sx={{ width: '100%', flex: 1 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      {...props}
    >
      {menus.map((menu) => (
        <Fragment key={menu.path}>
          <ListItem
            disableGutters
            disablePadding
            secondaryAction={
              menu.children
                ? (
                  <ListItemIcon>
                    <IconButton edge="end" aria-label="collapse" onClick={() => handleCollapse(menu.path)}>
                      {collapsedItems.includes(menu.path)
                        ? <ExpandLessIcon />
                        : <ExpandMoreIcon />
                      }
                    </IconButton>
                  </ListItemIcon>
                )
                : null
            }
          >
            <ListItemButton
              component={Link}
              to={menu.path}
              onClick={() => handleCollapse(menu.path)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} secondary={menu.description} />
            </ListItemButton>
          </ListItem>
          {menu.children && (
            <Collapse in={collapsedItems.includes(menu.path)} timeout="auto" unmountOnExit>
              <DashboardMenu component="div" disablePadding menus={menu.children} />
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default DashboardMenu;
