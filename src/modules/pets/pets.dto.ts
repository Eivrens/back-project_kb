export type PetDTO = {
  name: string;
  dt_birth: Date;
  gender: string;
  color: string;
  description: string;
  species: SpeciesPet;
  situation: SituationPet;
};

export enum SituationPet {
  disponivel = 1,
  adotado = 2,
  triagem = 3,
}

export enum SpeciesPet {
  gato = 1,
  cachorro = 2,
}
