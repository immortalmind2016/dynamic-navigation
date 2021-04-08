import cuid from "cuid";
import react, { useEffect, useRef, useState } from "react";

const categoriesMenu = [
  {
    id: cuid(),
    title: "women",
    menus: [
      { id: cuid(), title: "women", menus: [] },
      { id: cuid(), title: "man", menus: [] },
      { id: cuid(), title: "childs", menus: [] },
    ],
  },
  { id: cuid(), title: "man", menus: [] },
  { id: cuid(), title: "childs", menus: [] },
];
const coverMenu = [
  { id: cuid(), title: "xiomi", menus: [] },
  { id: cuid(), title: "samsung", menus: [] },
];
const cCoverMenu = [
  { id: cuid(), title: "HP", menus: [] },
  { id: cuid(), title: "Dell", menus: [] },
];
const mobileMenu = [{ id: cuid(), title: "cover", menus: coverMenu }];
const computerMenu = [{ id: cuid(), title: "pc covers", menus: cCoverMenu }];

const productsMenu = [
  { id: cuid(), title: "computer", menus: computerMenu },
  { id: cuid(), title: "mobile", menus: mobileMenu },
];
const initialMenus = [
  { id: cuid(), title: "home", menus: [] },
  { id: cuid(), title: "other", menus: [] },

  { id: cuid(), title: "categories", menus: categoriesMenu },
  { id: cuid(), title: "products", menus: productsMenu },
];

const MenuItem = ({
  index,
  id,
  title,
  children,
  style,
  level,
  parentId,
  moveMenuItem,
  className,
  closedFromController,
  openFromController,
}) => {
  const [opened, open] = useState(false);

  useEffect(() => {
    open(!closedFromController && opened);
  }, [opened, closedFromController]);
  let ref = useRef(null);

  console.log("REF CURRENT ", ref.current);
  return (
    <>
      <div className={className} style={{ position: "relative" }}>
        <div
          onMouseOver={() => {
            open(!opened);
            openFromController(id);
          }}
          style={{ marginTop: "1px", ...style }}
        >
          {title}
          {children.length > 0 &&
            (!parentId ? (opened ? "⯅" : "⯆") : opened ? "⯇" : "⯈")}
        </div>
        {opened && children.length > 0 && (
          <div
            onMouseLeave={() => {
              open(!opened);
            }}
            style={{
              background: "white",
              borderRadius: "1px",
              position: "absolute",
              top: level == 0 ? `27px` : `-1px`,
              left: level >= 1 && `160px`,
            }}
          >
            <RenderMenus
              level={level + 1}
              moveMenuItem={moveMenuItem}
              className="menu-item"
              style={{ marginTop: `${0 * 10}px` }}
              parentId={id}
              menus={children}
            ></RenderMenus>
          </div>
        )}
      </div>
    </>
  );
};
const RenderMenus = ({
  menus,
  parentId,
  style,
  level,
  moveMenuItem,
  className,
  close,
}) => {
  const [closedArray, setClosedArray] = useState([]);
  useEffect(() => {
    if (menus.length > 0) {
      let _closedArray = menus.reduce((prev, current) => {
        return {
          ...prev,
          [current.id]: {
            id: current.id,
            level: current.level,
            closed: true,
            title: current.title,
          },
        };
      }, {});

      setClosedArray(_closedArray);
    }
  }, [menus]);
  const open = (id) => {
    try {
      let _closedArray = { ...closedArray };
      for (let menu in _closedArray) {
        _closedArray[menu].closed = true;
      }
      _closedArray[id].closed = false;

      setClosedArray(_closedArray);
    } catch (e) {}
  };
  console.log(
    "🚀 ~ file: Main.jsx ~ line 142 ~ open ~ closedArray",
    closedArray
  );

  return (
    <>
      {menus.map((menu, index) => (
        <>
          <MenuItem
            key={menu.id}
            openFromController={open}
            closedFromController={closedArray[menu.id]?.closed}
            close={close}
            moveMenuItem={moveMenuItem}
            className={className}
            level={parentId ? level : 0}
            style={style}
            index={index}
            parentId={parentId}
            id={menu.id}
            children={menu.menus}
            title={menu.title}
          ></MenuItem>
        </>
      ))}
    </>
  );
};
export const Main = () => {
  let [menus, setMenus] = useState([]);
  useEffect(() => {
    console.log("UseEfeect");
    setMenus(initialMenus);
  }, []);
  const moveMenuItem = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    if (!dragParent && !hoverParent) {
      console.log("SWAP");
      let copyMenus = [...menus];
      let temp = copyMenus[dragIndex];
      copyMenus[dragIndex] = copyMenus[hoverIndex];
      copyMenus[hoverIndex] = temp;

      try {
        setMenus(copyMenus);
      } catch (e) {}
      console.log(copyMenus);
    }
  };
  console.log("OUT SIDE ", menus);
  return (
    <>
      <div className="main-menu">
        <RenderMenus moveMenuItem={moveMenuItem} menus={menus}></RenderMenus>
      </div>
    </>
  );
};
