import { toHumanPrice } from '../../../views/base';

export const cadreCompensationMarkup = (flight, forRedirection) => {

	const markup = `
	  <div class="background__container">
      <div class="compensation-background-layer">
        ${forRedirection}
  			<div class="compensation__container">

  				<div class="compensation__stats__container">
              <div class="compensation__parts__container">
    				  	<div class="compensation__first__part">
    						  <h4>Ma neutralisation carbone</h4>
    					  	<ul class="compensation__icons">
                    <li class="c-target" id="active__measure"><img src="https://res.cloudinary.com/tark-industries/image/upload/v1562370362/Co2_icon.png" style="height:45px;"></li>
    					  	  <li>€</li>
    					  	  <li class="tree__pictures__compensation t-target" ><img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;padding-left: 8px;margin-bottom: 14px;"></li>
                    <li class="p-target">%</li>
    					    </ul>
    				  	</div>
    	                 
    				  	<div class="compensation__second__part">
                  <div class="compensation__slider__debut__fin position__lower">
                    <p>0 kg</p>
                  </div>
    				  	  <div id="slider__compensation" style="height: 14px;">
                    <div class="compensation__display__data">
                      <div id="compensation__data__target__skytreep"><p style="background-color: #009AAC;"></p></div>
                      <div id="compensation__data__target__user"><p></p></div>
                    </div>
                    <div class="compensation__repartition__dette">
                      <div class="participation__treep"><p>La part de Skytree'p</p></div>
                      <div class="participation__user"><p>Votre mission écologique si vous l'acceptez</p></div>
                    </div>
    				  	    <input  id="total-compensation" type="hidden" value="">
                    <input  id="user-compensation" type="hidden" value="">
    				  	  </div>
                  <div class="compensation__slider__debut__fin position__upper">
                    <p></p>
                  </div>
    				  	</div>
              </div>

  				  	
  				</div>
  			</div>
      </div>
		</div>
	`
	return markup
}


// <div class="compensation__third__part">
//               </div>