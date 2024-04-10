import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SvgIconTypeMap } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List, { ListProps } from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { alpha } from "@mui/material/styles";
import { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useMaterialTheme } from "../lib/material-theme";

export interface DashboardMenuItem {
  readonly title: string;
  readonly description?: string;
  readonly icon: OverridableComponent<SvgIconTypeMap>;
  readonly path: string;
  readonly children?: DashboardMenuItem[];
}

export interface DashboardMenuProps extends ListProps {
  readonly menus: DashboardMenuItem[];
  readonly submenu?: boolean;
}

const DashboardMenu: FC<DashboardMenuProps> = ({ menus, submenu, ...props }) => {
  const [collapsedItems, setCollapsedItems] = useState<string[]>([]);
  const theme = useMaterialTheme();

  const handleCollapse = (menuId: string) => {
    setCollapsedItems((prevItems) =>
      prevItems.includes(menuId)
        ? prevItems.filter((id) => id !== menuId)
        : [...prevItems, menuId]
    );
  };

  return (
    <List
      sx={{
        flex: 1,
        ...(submenu
          ? {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            borderRadius: 1,
            ml: 3,
            mr: 1,
          }
          : {}),
      }}
      component={submenu ? "div" : "nav"}
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
                    <IconButton
                      edge="end"
                      aria-label="collapse"
                      onClick={() => handleCollapse(menu.path)}
                    >
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
            >
              <ListItemIcon>
                <menu.icon fontSize={submenu ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText primary={menu.title} secondary={menu.description} />
            </ListItemButton>
          </ListItem>
          {menu.children && (
            <Collapse in={collapsedItems.includes(menu.path)} timeout="auto" unmountOnExit>
              <DashboardMenu submenu dense disablePadding menus={menu.children} />
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default DashboardMenu;
