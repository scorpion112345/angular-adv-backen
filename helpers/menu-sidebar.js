const getMenuSidebar = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      children: [
        { title: "Main", url: "/" },
        { title: "ProgressBar", url: "progress" },
        { title: "Graficas", url: "grafica1" },
        { title: "Promesas", url: "promesas" },
        { title: "Rxjs", url: "rxjs" },
      ],
    },
    {
      title: "Mantenimiento",
      icon: "mdi mdi-folder-lock-open",
      children: [
        //{ title: 'usuarios', url: 'usuarios' },
        { title: "hospitales", url: "hospitales" },
        { title: "medicos", url: "medicos" },
      ],
    },
  ];
  if (role === "ADMIN_ROLE") {
    menu[1].children.unshift({ title: "usuarios", url: "usuarios" });
  }
  return menu;
};

module.exports = {
  getMenuSidebar,
};
