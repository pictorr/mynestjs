import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { JoiValidationPipe } from 'src/validation.pipe';
import { Roles, Public} from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Public()
  // @Roles('admin')
  @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
  @Get()
  @Roles('user')
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
