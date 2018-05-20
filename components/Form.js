export const Label = props => (
  <label
    className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
    {...props}
  />
)
export const Select = ({ className, ...props }) => (
  <select
    className={
      "bg-grey-lighter border-2 border-grey-lighter rounded w-full py-4 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)
export const Input = ({ className, ...props }) => (
  <input
    className={
      "bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-4 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)
export const Textarea = ({ className, ...props }) => (
  <textarea
    className={
      "bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-4 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)
export const Checkbox = ({ className, ...props }) => (
  <input
    type="checkbox"
    className={
      "bg-grey-lighter border-2 border-grey-lighter rounded p-4 w-6 h-6 text-grey-darker " +
      className
    }
    {...props}
  />
)
