                <div class="positioning__block block--borders block--hidden">
                  <div class="positioning__visual">
                    <!--Визуальное отображение расположения вотермарка (расстояние между границами)-->
                    <div class="visual__borders">
                      <span class="border__line line--x">горизонтальная линия</span>
                      <span class="border__line line--y">вертикальная линия</span>
                    </div>
                    <table class="visual__box">
                      <tbody class="box__body">
                        <tr class="box__row">
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="11"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="12"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="13"></button>
                          </td>
                        </tr>
                        <tr class="box__row">
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="21"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="22"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="23"></button>
                          </td>
                        </tr>
                        <tr class="box__row">
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="31"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="32"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="33"></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="positioning__switch">
                    <div class="switch__block block--vertical">
                      <input id="y-border" class="form__input input--switch" type="text" value="1" name="yBorder" disabled="true">
                      <div class="switch__controls controls--borders">
                        <button data-border="y-b-up" class="btn--up js-switch-border">Больше</button>
                        <button data-border="y-b-down" class="btn--down js-switch-border">Меньше</button>
                      </div>
                    </div>
                    <div class="switch__block block--horizontal">
                      <input id="x-border" class="form__input input--switch" type="text" value="1" name="xBorder" disabled="true">
                      <div class="switch__controls controls--borders">
                        <button data-border="x-b-up" class="btn--up js-switch-border">Больше</button>
                        <button data-border="x-b-down" class="btn--down js-switch-border">Меньше</button>
                      </div>
                    </div>
                  </div>
                </div>