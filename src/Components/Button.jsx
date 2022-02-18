export default function Button({children , className , ...rest}){
  return(
    <button  className={className} {...rest}>{children}</button>
  )
}