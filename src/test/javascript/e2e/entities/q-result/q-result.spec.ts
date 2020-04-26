import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QResultComponentsPage, QResultDeleteDialog, QResultUpdatePage } from './q-result.page-object';

const expect = chai.expect;

describe('QResult e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let qResultComponentsPage: QResultComponentsPage;
  let qResultUpdatePage: QResultUpdatePage;
  let qResultDeleteDialog: QResultDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load QResults', async () => {
    await navBarPage.goToEntity('q-result');
    qResultComponentsPage = new QResultComponentsPage();
    await browser.wait(ec.visibilityOf(qResultComponentsPage.title), 5000);
    expect(await qResultComponentsPage.getTitle()).to.eq('eo2GatewayApp.qResult.home.title');
    await browser.wait(ec.or(ec.visibilityOf(qResultComponentsPage.entities), ec.visibilityOf(qResultComponentsPage.noResult)), 1000);
  });

  it('should load create QResult page', async () => {
    await qResultComponentsPage.clickOnCreateButton();
    qResultUpdatePage = new QResultUpdatePage();
    expect(await qResultUpdatePage.getPageTitle()).to.eq('eo2GatewayApp.qResult.home.createOrEditLabel');
    await qResultUpdatePage.cancel();
  });

  it('should create and save QResults', async () => {
    const nbButtonsBeforeCreate = await qResultComponentsPage.countDeleteButtons();

    await qResultComponentsPage.clickOnCreateButton();

    await promise.all([
      qResultUpdatePage.quizSelectLastOption(),
      qResultUpdatePage.userSelectLastOption(),
      qResultUpdatePage.questionSelectLastOption(),
      qResultUpdatePage.propositionSelectLastOption()
    ]);

    const selectedValid = qResultUpdatePage.getValidInput();
    if (await selectedValid.isSelected()) {
      await qResultUpdatePage.getValidInput().click();
      expect(await qResultUpdatePage.getValidInput().isSelected(), 'Expected valid not to be selected').to.be.false;
    } else {
      await qResultUpdatePage.getValidInput().click();
      expect(await qResultUpdatePage.getValidInput().isSelected(), 'Expected valid to be selected').to.be.true;
    }

    await qResultUpdatePage.save();
    expect(await qResultUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await qResultComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last QResult', async () => {
    const nbButtonsBeforeDelete = await qResultComponentsPage.countDeleteButtons();
    await qResultComponentsPage.clickOnLastDeleteButton();

    qResultDeleteDialog = new QResultDeleteDialog();
    expect(await qResultDeleteDialog.getDialogTitle()).to.eq('eo2GatewayApp.qResult.delete.question');
    await qResultDeleteDialog.clickOnConfirmButton();

    expect(await qResultComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
