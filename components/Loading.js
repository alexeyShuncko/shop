import Image from 'next/image'
import  loading  from '../public/Loading.svg'

export const Loading =()=> {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px'}}>
          <span style={{fontSize: '1.2em', fontWeight: '600'}}>Загрузка ...</span>
          <Image src={loading} 
          alt='Загрузка ...' 
          width={50}
          height={50}/>
        </div>
      )
}