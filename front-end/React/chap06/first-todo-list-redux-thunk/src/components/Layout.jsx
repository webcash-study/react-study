const layoutClassName = `
  border-[1px] border-solid border-gray-500
  p-[32px] rounded-[6px] w-[50%] m-auto
`;

function Layout({ children }) {
  return <div className={layoutClassName}>{children}</div>;
}

export default Layout;
