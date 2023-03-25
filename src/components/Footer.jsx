/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import '../css/Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <section className="more-infos">
          <ul>
            <li>Planos</li>
            <li>Contate-nos</li>
            <li>Qual música ou artista você quer ver por aqui?</li>
          </ul>
        </section>
        <section className="credits">
          <h4>
            Desenvolvidor por:
            {' '}
            <span>Victor Matias</span>
          </h4>
          <section className="contact">
            <p>Contato:</p>
            <ul>
              <li>
                <a
                  href="https://br.linkedin.com/in/-victormatias?trk=people-guest_people_search-card"
                >
                  Linkedin
                </a>

              </li>
              <li>
                <a
                  href="https://github.com/victormatia"
                >
                  GitHub
                </a>

              </li>
              <li>
                <a
                  href="https://fvictor1705@gmail.com"
                >
                  Gmail
                </a>

              </li>
            </ul>
          </section>
          <p>Um projeto avaliativo desenvolvido por: Trybe</p>
        </section>
      </footer>
    );
  }
}
