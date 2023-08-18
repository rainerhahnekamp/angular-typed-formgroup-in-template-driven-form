import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';

interface SearchParams {
  from: string;
  to: string;
}

type TypedFormGroup<Type> = FormGroup<{
  [Property in keyof Type]: FormControl<Type[Property]>;
}>;

async function getFormGroup<Type>(ngForm: NgForm | undefined) {
  if (ngForm === undefined) {
    throw new Error('passed value is null or undefined');
  }
  return ngForm.form as TypedFormGroup<Type>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form>
      <input [(ngModel)]="searchParams.from" name="from" required />
      <input [(ngModel)]="searchParams.to" name="to" required />
    </form>
  `,
})
export class AppComponent implements AfterViewInit {
  searchParams: SearchParams = {
    from: 'Vienna',
    to: 'London',
  };

  @ViewChild(NgForm) ngForm: NgForm | undefined;

  async ngAfterViewInit() {
    const formGroup = await getFormGroup<SearchParams>(this.ngForm);
    formGroup.controls.from.valueChanges.subscribe(console.log);
  }
}
