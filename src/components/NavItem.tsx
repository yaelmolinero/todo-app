interface Props {
  isSelected: boolean;
  children: React.ReactNode;
  handleClick?: () => void
}

function NavItem({ isSelected, children, handleClick }: Props) {
  const selectedStyle = isSelected ? "group-[.is-visible]:bg-bgTertiary-light group-[.is-visible]:dark:bg-bgTertiary-dark text-primary-light dark:text-primary-dark" : "text-secondary-light dark:text-secondary-dark";
  return (
    <li
      onClick={handleClick}
      className={`group/item flex items-center group-[.is-visible]:px-2 py-1 mb-0.5 rounded-lg font-semibold transition-colors group-[.is-visible]:hover:bg-bgTertiary-light group-[.is-visible]:dark:hover:bg-bgTertiary-dark ${selectedStyle}`}
    >
      { children }
    </li>
  );
}

export default NavItem;
