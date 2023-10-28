 

const Alerta = ({alerta}) => {
  return (
    <div 
    className={`${alerta.error ? 'from-primary to-pendingTask ' : 
    'from-text to-teal'} bg-gradient-to-br text-center p-3 rounded-xl uppercase
    text-white font-bold text-sm`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta
