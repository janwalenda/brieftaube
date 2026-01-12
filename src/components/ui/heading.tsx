export function H1({ ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1 className="text-4xl font-bold" {...props} />
  )
}

export function H2({ ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 className="text-3xl font-bold" {...props} />
  )
}

export function H3({ ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className="text-2xl font-bold" {...props} />
  )
}

export function H4({ ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4 className="text-xl font-bold" {...props} />
  )
}

export function H5({ ...props }: React.ComponentProps<'h5'>) {
  return (
    <h5 className="text-lg font-bold" {...props} />
  )
}

export function H6({ ...props }: React.ComponentProps<'h6'>) {
  return (
    <h6 className="text-base font-bold" {...props} />
  )
}
