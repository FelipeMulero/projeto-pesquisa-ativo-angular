import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
  })
  
  export class SearchBarComponent {
    @Output() searchSubmit = new EventEmitter<string>();
    assetForm!: FormGroup;
  
    constructor(private readonly fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.assetForm = this.fb.group({
        asset: new FormControl(null, Validators.required),
      });
    }
  
    onSubmit(): void {
      const assetValue = this.assetForm.get('asset')?.value;
      this.searchSubmit.emit(assetValue);
    }
  }