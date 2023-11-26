
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetDetailsComponent } from './asset-details.component';
import { YahooFinanceService } from 'src/app/core/services/yahoo-finance.service';
import { YahooFinanceServiceMock } from 'src/app/core/services/yahoo-finance-mock';

describe('AssetDetailsComponent', () => {
  let component: AssetDetailsComponent;
  let fixture: ComponentFixture<AssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetDetailsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: YahooFinanceService, useClass: YahooFinanceServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset data on submit', () => {
    const spyResetData = spyOn(component, 'resetData').and.callThrough();

    component.submitAsset();

    expect(spyResetData).toHaveBeenCalled();
  });

});
