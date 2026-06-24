

export class User {
  constructor({id= null, name, surname, email, birthdate, telephone, city, province, applied_position,application_date =new Date() ,status = 'pending'}) 
  {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.birthdate = birthdate;
    this.telephone = telephone;
    this.city = city;
    this.province = province;
    this.applied_position = applied_position;
    this.application_date = application_date;
    this.status = status;
  }

toFirestore() 
{
    return {
      
      name: this.name,
      surname: this.surname,
      email: this.email,
      birthdate: this.birthdate,
      telephone: this.telephone,
      city: this.city,
      province: this.province,
      applied_position: this.applied_position,
      application_date: this.application_date,
      status: this.status
    };
  }

    static fromFirestore(doc) 
    {   
    if (!doc.exists) return null;

    const data = doc.data();
    
    return new User({
      id: doc.id, // Recuperamos el ID del documento
      name: data.name,
      surname: data.surname,
      email: data.email,
      birthdate: data.birthdate,
      telephone: data.telephone,
      city: data.city,
      province: data.province,
      applied_position: data.applied_position,
      // Si guardaste la fecha como Date, Firebase la devuelve como Timestamp. La convertimos:
      application_date: data.application_date ? data.application_date.toDate() : null,
      status: data.status
    })
    }
}
