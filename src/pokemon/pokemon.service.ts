import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
            @InjectModel(Pokemon.name)
            private readonly pokemonModel: Model<Pokemon>
          ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    let pokemon;
    try {
      pokemon = await this.pokemonModel.create(createPokemonDto);
    }
    catch (error) {
      this.handleExceptions(error);
    }

    return pokemon;
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon;

    if (!isNaN(+searchTerm)) {
      pokemon = await this.pokemonModel.findOne({ no: searchTerm });
    }

    if (!pokemon && isValidObjectId(searchTerm)) {
      pokemon = await this.pokemonModel.findById(searchTerm);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: searchTerm.toLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no ${searchTerm} not found`);
    }
    return pokemon;
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchTerm);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no ${searchTerm} not found`);
    }

    if (updatePokemonDto.name) {
      pokemon.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }

    return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  async remove(id: string) {

    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletedCount) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists: ${JSON.stringify(error.keyValue)}`);	
    }
    throw new InternalServerErrorException('Cannot create or update Pokemon - Check server logs');
  }
}
