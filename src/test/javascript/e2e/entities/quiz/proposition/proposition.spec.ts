import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PropositionComponentsPage, PropositionDeleteDialog, PropositionUpdatePage } from './proposition.page-object';

const expect = chai.expect;

describe('Proposition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let propositionComponentsPage: PropositionComponentsPage;
  let propositionUpdatePage: PropositionUpdatePage;
  let propositionDeleteDialog: PropositionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Propositions', async () => {
    await navBarPage.goToEntity('proposition');
    propositionComponentsPage = new PropositionComponentsPage();
    await browser.wait(ec.visibilityOf(propositionComponentsPage.title), 5000);
    expect(await propositionComponentsPage.getTitle()).to.eq('eo2GatewayApp.quizProposition.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(propositionComponentsPage.entities), ec.visibilityOf(propositionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Proposition page', async () => {
    await propositionComponentsPage.clickOnCreateButton();
    propositionUpdatePage = new PropositionUpdatePage();
    expect(await propositionUpdatePage.getPageTitle()).to.eq('eo2GatewayApp.quizProposition.home.createOrEditLabel');
    await propositionUpdatePage.cancel();
  });

  it('should create and save Propositions', async () => {
    const nbButtonsBeforeCreate = await propositionComponentsPage.countDeleteButtons();

    await propositionComponentsPage.clickOnCreateButton();

    await promise.all([
      propositionUpdatePage.setStatementInput('statement'),
      propositionUpdatePage.setExplanationInput('explanation'),
      propositionUpdatePage.questionSelectLastOption()
    ]);

    expect(await propositionUpdatePage.getStatementInput()).to.eq('statement', 'Expected Statement value to be equals to statement');
    const selectedValid = propositionUpdatePage.getValidInput();
    if (await selectedValid.isSelected()) {
      await propositionUpdatePage.getValidInput().click();
      expect(await propositionUpdatePage.getValidInput().isSelected(), 'Expected valid not to be selected').to.be.false;
    } else {
      await propositionUpdatePage.getValidInput().click();
      expect(await propositionUpdatePage.getValidInput().isSelected(), 'Expected valid to be selected').to.be.true;
    }
    expect(await propositionUpdatePage.getExplanationInput()).to.eq(
      'explanation',
      'Expected Explanation value to be equals to explanation'
    );

    await propositionUpdatePage.save();
    expect(await propositionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await propositionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Proposition', async () => {
    const nbButtonsBeforeDelete = await propositionComponentsPage.countDeleteButtons();
    await propositionComponentsPage.clickOnLastDeleteButton();

    propositionDeleteDialog = new PropositionDeleteDialog();
    expect(await propositionDeleteDialog.getDialogTitle()).to.eq('eo2GatewayApp.quizProposition.delete.question');
    await propositionDeleteDialog.clickOnConfirmButton();

    expect(await propositionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
